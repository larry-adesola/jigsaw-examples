// A Jigsaw page app: no login code, no server. Editors add clients; everyone the owner adds can read them.
// Jigsaw signs the visitor in, stores the data, and refuses writes from viewers whatever this file does.
const api = async (path, options = {}) => {
  const res = await fetch('/_jigsaw/' + path, { ...options, headers: { 'content-type': 'application/json' } })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `Request failed (${res.status})`)
  return res.status === 204 ? null : res.json()
}
const problem = document.getElementById('problem')
const show = (err) => (problem.textContent = err.message)
const list = document.getElementById('clients')
const form = document.getElementById('add')
let canEdit = false

async function render() {
  const { records } = await api('data/clients')
  // Jigsaw returns the oldest first; the newest client is the one people look for.
  list.replaceChildren(...records.reverse().map((record) => {
    const item = document.createElement('li')
    const name = document.createElement('strong')
    name.textContent = record.data.name
    const contact = document.createElement('p')
    contact.textContent = record.data.contact
    const need = document.createElement('p')
    need.textContent = record.data.need
    const by = document.createElement('small')
    by.textContent = `added by ${record.createdBy} on ${new Date(record.createdAt).toLocaleDateString()}`
    item.append(name, contact, need, by)
    if (canEdit) {
      const remove = document.createElement('button')
      remove.textContent = 'Remove'
      remove.onclick = () => api(`data/clients/${record.id}`, { method: 'DELETE' }).then(render, show)
      item.append(remove)
    }
    return item
  }))
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  api('data/clients', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    .then(() => (form.reset(), render()), show)
})

api('me').then((me) => {
  canEdit = me.role !== 'viewer'
  document.getElementById('who').textContent = `You are ${me.email} (${me.role}).`
  form.hidden = !canEdit
  return render()
}).catch(show)
