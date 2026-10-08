// A Jigsaw page app: no login code, no server. Jigsaw signs the visitor in,
// stores the data, and refuses writes from viewers whatever this file does.
const list = document.getElementById('shifts')
const form = document.getElementById('add')
const problem = document.getElementById('problem')
let canEdit = false

const api = async (path, options = {}) => {
  const res = await fetch('/_jigsaw/' + path, { ...options, headers: { 'content-type': 'application/json' } })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `Request failed (${res.status})`)
  return res.status === 204 ? null : res.json()
}

async function render() {
  const { records } = await api('data/shifts')
  list.replaceChildren(...records.map((record) => {
    const item = document.createElement('li')
    const label = document.createElement('span')
    label.textContent = `${record.data.name} on ${record.data.day}`
    const by = document.createElement('small')
    by.textContent = `added by ${record.createdBy}`
    item.append(label, by)
    if (canEdit) {
      const remove = document.createElement('button')
      remove.textContent = 'Remove'
      remove.onclick = () => api(`data/shifts/${record.id}`, { method: 'DELETE' }).then(render, show)
      item.append(remove)
    }
    return item
  }))
}
const show = (err) => (problem.textContent = err.message)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  const data = Object.fromEntries(new FormData(form))
  api('data/shifts', { method: 'POST', body: JSON.stringify(data) }).then(() => (form.reset(), render()), show)
})

api('me').then((me) => {
  canEdit = me.role !== 'viewer'
  document.getElementById('who').textContent = `You are ${me.email} (${me.role}).`
  form.hidden = !canEdit
  return render()
}).catch(show)
