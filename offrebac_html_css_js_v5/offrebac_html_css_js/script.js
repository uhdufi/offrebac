const WHATSAPP_NUMBER = "212663271459";

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) menuToggle.textContent = "☰";
}));

const form = document.querySelector("#registerForm");
const formError = document.querySelector("#formError");
form?.addEventListener("submit", event => {
  event.preventDefault();
  formError.hidden = true;
  const fullName = document.querySelector("#fullName").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  const track = form.querySelector('input[name="track"]:checked')?.value;
  const normalizedPhone = phone.replace(/[\s().-]/g, "");
  const validPhone = /^(?:(?:\+212)|0)(?:[567]\d{8})$/.test(normalizedPhone);
  if (fullName.length < 2) {
    showError("دخل الاسم الكامل ديالك من فضلك.");
    document.querySelector("#fullName").focus();
    return;
  }
  if (!validPhone) {
    showError("تأكد من رقم الهاتف المغربي. مثال: 0612345678 أو +212612345678.");
    document.querySelector("#phone").focus();
    return;
  }
  if (!track) {
    showError("اختار المسلك ديالك: PC أو SVT.");
    return;
  }
  const message = [
    "السلام عليكم، بغيت نعرف تفاصيل عرض Offre Bac 2027.",
    "",
    `الاسم الكامل: ${fullName}`,
    `رقم الهاتف: ${phone}`,
    `المسلك: ${track}`,
    "العرض: خمس مواد لعام دراسي كامل — 899 DH",
    "",
    "عافاكم وضحو ليا المحتوى وطريقة الاستفادة وشروط الأداء قبل التأكيد."
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
}


document.querySelector("#clearProgress")?.addEventListener("click", () => {
  alert("الموقع ما كيحفظش معلومات التسجيل فهاد الجهاز.");
});
