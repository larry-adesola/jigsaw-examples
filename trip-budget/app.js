// A Jigsaw page app: no login code, no server. Until the owner adds someone, only the owner can open it.
// Jigsaw signs the visitor in, stores the data, and refuses writes from viewers whatever this file does.
const api = async (path, options = {}) => {
  const res = await fetch('/_jigsaw/' + path, { ...options, headers: { 'content-type': 'application/json' } })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `Request failed (${res.status})`)
  return res.status === 204 ? null : res.json()
}
const problem = document.getElementById('problem')
const show = (err) => (problem.textContent = err.message)
const list = document.getElementById('expenses')
const add = document.getElementById('add')
const set = document.getElementById('set')
const money = (amount) => amount.toFixed(2)
let canEdit = false
let budget = null // the one record in the "budget" list, once it has been set

async function render() {
  const [{ records: budgets }, { records: expenses }] = await Promise.all([api('data/budget'), api('data/expenses')])
  budget = budgets[0] ?? null
  const spent = expenses.reduce((sum, record) => sum + record.data.amount, 0)
  document.getElementById('budget').textContent = budget ? money(budget.data.amount) : 'Not set'
  document.getElementById('spent').textContent = money(spent)
  document.getElementById('left').textContent = budget ? money(budget.data.amount - spent) : '–'
  list.replaceChildren(...expenses.map((record) => {
    const item = document.createElement('li')
    const label = document.createElement('span')
    label.textContent = record.data.what
    const amount = document.createElement('strong')
    amount.textContent = money(record.data.amount)
    item.append(label, amount)
    if (canEdit) {
      const remove = document.createElement('button')
      remove.textContent = 'Remove'
      remove.onclick = () => api(`data/expenses/${record.id}`, { method: 'DELETE' }).then(render, show)
      item.append(remove)
    }
    return item
  }))
}

set.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  const body = JSON.stringify({ amount: Number(new FormData(set).get('amount')) })
  // The first time there is nothing to replace, so the budget is added; after that it is replaced.
  const save = budget ? api(`data/budget/${budget.id}`, { method: 'PUT', body }) : api('data/budget', { method: 'POST', body })
  save.then(() => (set.reset(), render()), show)
})

add.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  const data = Object.fromEntries(new FormData(add))
  api('data/expenses', { method: 'POST', body: JSON.stringify({ what: data.what, amount: Number(data.amount) }) })
    .then(() => (add.reset(), render()), show)
})

api('me').then((me) => {
  canEdit = me.role !== 'viewer'
  document.getElementById('who').textContent = `You are ${me.email} (${me.role}).`
  add.hidden = set.hidden = !canEdit
  return render()
}).catch(show)
