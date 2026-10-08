// A Jigsaw page app: no login code, no server. Everyone the owner adds sees the same counts.
// Jigsaw signs the visitor in, stores the data, and refuses writes from viewers whatever this file does.
const api = async (path, options = {}) => {
  const res = await fetch('/_jigsaw/' + path, { ...options, headers: { 'content-type': 'application/json' } })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `Request failed (${res.status})`)
  return res.status === 204 ? null : res.json()
}
const problem = document.getElementById('problem')
const show = (err) => (problem.textContent = err.message)
const list = document.getElementById('items')
const form = document.getElementById('add')
let canEdit = false

async function render() {
  const { records } = await api('data/items')
  list.replaceChildren(...records.map((record) => {
    const item = document.createElement('li')
    const label = document.createElement('span')
    label.textContent = record.data.name
    const count = document.createElement('strong')
    count.textContent = record.data.count
    item.append(label)
    if (canEdit) item.append(step(record, -1), count, step(record, 1), remove(record))
    else item.append(count)
    return item
  }))
}

// ponytail: the new count is worked out from the number on screen, so two people pressing at the same
// moment can lose one press. Read the record again just before saving if that ever matters.
function step(record, by) {
  const button = document.createElement('button')
  button.className = 'step'
  button.textContent = by > 0 ? '+' : '−'
  button.setAttribute('aria-label', `${by > 0 ? 'One more' : 'One fewer'} ${record.data.name}`)
  // PUT replaces the whole record, so the name goes back with the new count.
  button.onclick = () => api(`data/items/${record.id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...record.data, count: Math.max(0, record.data.count + by) }),
  }).then(render, show)
  return button
}

function remove(record) {
  const button = document.createElement('button')
  button.textContent = 'Remove'
  button.onclick = () => api(`data/items/${record.id}`, { method: 'DELETE' }).then(render, show)
  return button
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  const data = Object.fromEntries(new FormData(form))
  api('data/items', { method: 'POST', body: JSON.stringify({ name: data.name, count: Number(data.count) }) })
    .then(() => (form.reset(), render()), show)
})

api('me').then((me) => {
  canEdit = me.role !== 'viewer'
  document.getElementById('who').textContent = `You are ${me.email} (${me.role}).`
  form.hidden = !canEdit
  // Someone else may be counting too: look again every few seconds.
  setInterval(() => render().catch(show), 5000)
  return render()
}).catch(show)
