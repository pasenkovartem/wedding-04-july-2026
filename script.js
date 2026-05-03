const slides = document.querySelectorAll('.slide');
let index = 0;

function openPage() {
	const p1 = document.getElementById("page1");
	const p2 = document.getElementById("page2");

	const audio = document.getElementById("bg-sound");

	// Растворяем первую страницу
	p1.style.transition = "opacity 1.2s ease";
	p1.style.opacity = "0";

	// Показываем вторую
	setTimeout(() => {
		p1.style.display = "none"; // убрать с потока
		p2.classList.remove("page2-hidden"); // показать п2
		p2.style.position = "relative"; // разрешаем скроллинг
		p2.style.inset = "auto"; // сбрасываем фиксированное позиционирование

		p2.style.width = "100vw"; // убирает сдвиг из-за скрола
		p2.style.margin = "0";
		p2.style.padding = "0";

		audio.volume = 0.3; // можно настроить громкость
		audio.play().catch(e => console.log("Автовоспроизведение заблокировано: ", e));
	}, 1200);

	// После показа второй страницы добавьте:
	/*document.body.style.overflow = 'auto'; // разрешаем скроллинг*/

	initTextAnimation();
}

/* ССЫЛКА НА ЯНДЕКС КАРТЫ */
function openYandexMap() {
	window.open('https://2gis.ru/omsk/geo/282003257731243/73.035114,55.269046', '_blank');
}

/* АНИМАЦИЯ ТЕКСТА ПРИ СКРОЛЛЕ */
function initTextAnimation() {
	const textElement = document.querySelector('.photo-text2');

	// Создаем наблюдатель за элементом
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Когда элемент появляется в viewport, добавляем класс анимации
				entry.target.classList.add('animate');
			}
		});
	}, {
		threshold: 0.3 // Срабатывает когда 30% элемента видно
	});

	// Начинаем наблюдать за элементом
	if (textElement) {
		observer.observe(textElement);
	}
}

/* СЛАЙДЕР */
function showSlide(i) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[i].classList.add('active');
}

document.getElementById('arrowNext').addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

document.getElementById('arrowPrev').addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

/* автопрокрутка каждые 5 секунд */
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 6000);

/* ПРИСУТСТВИЕ */
document.getElementById("sendBtn").addEventListener("click", function () {

    const name = document.getElementById("nameField").value.trim();
    const status = document.querySelector('input[name="status"]:checked');
    const statusValue = status ? status.value : "";

    const drinks = [...document.querySelectorAll('.rsvp-check input:checked')]
                    .map(el => el.value)
                    .join(", ");

    // Формируем FormData, а не JSON
    let formData = new FormData();
    formData.append("timestamp", new Date().toISOString());
    formData.append("name", name);
    formData.append("status", statusValue);
    formData.append("comment", drinks);

    fetch("https://script.google.com/macros/s/AKfycbz6F2MUFDn-L5UOuHjxKmw2Vq8-swQB1L0AITzdds6z4rL5oWgXzqf5wpbYjacJTCLk/exec", {
        method: "POST",
        body: formData,
		mode: "no-cors"
    })
    .then(() => {
        alert("Спасибо! Данные отправлены.");
    })
    .catch(err => {
        alert("Ошибка отправки");
        console.log(err);
    });

});

/* ДО ВСТРЕЧИ ЧЕРЕЗ */
function updateCountdown() {
    const weddingDate = new Date("2026-07-04T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
