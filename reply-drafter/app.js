// A Jigsaw page app that calls an AI service without ever holding its key. The page asks Jigsaw to make
// the call; Jigsaw adds the key the owner saved under Keys, and hands back the service's answer.
const MODEL = 'claude-haiku-4-5-20251001' // small and quick; any model the owner's key can use works here
const form = document.getElementById('ask')
const problem = document.getElementById('problem')
const draft = document.getElementById('draft')

async function reply(message) {
  const res = await fetch('/_jigsaw/fetch', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      url: 'https://api.anthropic.com/v1/messages',
      method: 'POST',
      // No key here, and no placeholder for one: Jigsaw adds it.
      headers: { 'content-type': 'application/json', 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        messages: [{ role: 'user', content: `Draft a short, friendly reply to this message. Give only the reply.\n\n${message}` }],
      }),
    }),
  })
  const answer = await res.json().catch(() => ({}))
  // Jigsaw's own refusals carry { error: "…" }; the service's carry { error: { message: "…" } }.
  if (!res.ok) throw new Error(answer.error?.message ?? answer.error ?? `Request failed (${res.status})`)
  return answer.content.filter((part) => part.type === 'text').map((part) => part.text).join('')
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  problem.textContent = ''
  draft.textContent = 'Drafting…'
  const button = form.querySelector('button')
  button.disabled = true
  reply(new FormData(form).get('message'))
    .then((text) => (draft.textContent = text), (err) => ((draft.textContent = ''), (problem.textContent = err.message)))
    .finally(() => (button.disabled = false))
})

fetch('/_jigsaw/me').then((res) => res.json()).then((me) => {
  document.getElementById('who').textContent = `You are ${me.email} (${me.role}).`
})
