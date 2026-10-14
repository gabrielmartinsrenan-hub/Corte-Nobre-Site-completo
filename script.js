// Configure o número da barbearia com código do país, DDD e número, somente dígitos.
const WHATSAPP_NUMBER = "5500000000000";
const toggle = document.querySelector(".toggle");
const nav = document.querySelector("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}
document.getElementById("year").textContent = new Date().getFullYear();
const date = document.getElementById("date");
const now = new Date();
date.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
const phone = document.getElementById("phone");
phone.addEventListener("input", () => {
  let d = phone.value.replace(/\D/g, "").slice(0, 11);
  if (d.length > 10) d = d.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
  else if (d.length > 6) d = d.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  else if (d.length > 2) d = d.replace(/^(\d{2})(\d+)/, "($1) $2");
  phone.value = d;
});
document.getElementById("booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const messageEl = document.getElementById("message");
  if (!event.currentTarget.reportValidity()) return;
  if (WHATSAPP_NUMBER === "5500000000000") {
    messageEl.textContent = "Configure o número do WhatsApp em js/script.js antes de usar o agendamento.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const msg = [
    "Olá! Gostaria de solicitar um agendamento na Corte Nobre.",
    "", `Nome: ${data.get("name")}`, `WhatsApp: ${data.get("phone")}`,
    `Serviço: ${data.get("service")}`, `Data desejada: ${data.get("date")}`,
    `Horário preferido: ${data.get("time")}`, "", "Aguardo a confirmação. Obrigado!"
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  messageEl.textContent = "O WhatsApp foi aberto para você enviar a solicitação.";
});
