// components/waitlist/locale/ru.ts
// Russian strings for the Waitlist UI

import type { WaitlistDict } from "./dict";

const ru: WaitlistDict = {
    seo: {
    title: 'Resultity',
    description: 'Decentralized AI Inference Network',
  },
  hero: {
    h1: "Как вы хотите участвовать в тестнете?",
    sub: "Выберите один или несколько вариантов ниже — мы свяжемся с дальнейшими шагами.",
  },
  labels: {
    email: "E-mail",
    emailPlaceholder: "name@domain.com",
    howMany: "Сколько?",
  },
  emailHelp: {
    empty: "Ваш основной e-mail для связи.",
    ok: "Выглядит корректно.",
    bad: "Введите корректный e-mail.",
  },
  choices: {
    nodes: {
      title: "Запуск ноды",
      counts: {
        one: "1",
        two: "2",
        threePlus: "3+",
      },
    },
    api: {
      title: "Инференс API",
    },
    affiliate: {
      title: "Рефералка",
    },
    partnership: {
      title: "Партнёрство",
    },
  },
  actions: {
    submit: "Отправить",
  },
  notices: {
    privacy: "Мы используем это только для связи по тестнету и раннему доступу.",
    privacyLink: "Политика конфиденциальности",
  },
  feedback: {
    sent: "Заявка отправлена.",
    error: "Пожалуйста, заполните обязательные поля.",
  },
};

export default ru;
