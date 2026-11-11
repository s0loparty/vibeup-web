# msg-app

Приложение на Vue 3 и Vite.

## Рекомендуемая настройка редактора

[VS Code](https://code.visualstudio.com/) с расширением [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Если установлено расширение Vetur, отключите его.

## Рекомендуемая настройка браузера

- Браузеры на основе Chromium (Chrome, Edge, Brave и другие):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Включение Custom Object Formatter в Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Включение Custom Object Formatter в Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Поддержка типов при импорте `.vue` в TypeScript

По умолчанию TypeScript не обрабатывает типы импортируемых файлов `.vue`, поэтому для проверки типов вместо `tsc` используется `vue-tsc`. В редакторе для поддержки типов `.vue` служит расширение [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Настройка конфигурации

См. [справочник по конфигурации Vite](https://vite.dev/config/).

## Установка проекта

```sh
npm install
```

### Запуск для разработки с горячей перезагрузкой

```sh
npm run dev
```

### Проверка типов и production-сборка

```sh
npm run build
```

### Проверка с помощью [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Развёртывание через Dokploy

GitHub Actions собирает образ фронтенда и публикует его в GitHub Container Registry (GHCR). Dokploy скачивает и запускает готовый образ, не собирая приложение.

1. В GitHub откройте **Settings → Secrets and variables → Actions → Variables** и создайте переменную репозитория `VITE_API_BASE_URL`, например `https://api.example.com`. Укажите адрес API, доступный из браузера пользователя. Это публичное значение встраивается во фронтенд при сборке, поэтому не указывайте в нём секреты. Если API и фронтенд находятся на разных доменах, настройте CORS на стороне API так, чтобы разрешить запросы с домена фронтенда.
2. Отправьте изменения в `dokploy-deployment` или запустите **Build and publish Docker image** вручную на вкладке Actions. Каждая успешная сборка публикует тег `sha-<commit>`; сборки ветки `dokploy-deployment` также обновляют тег `latest`. После изменения адреса API запустите workflow заново, чтобы создать новый образ.
3. В разделе **Packages** на GitHub сделайте пакет GHCR публичным или настройте в Dokploy аутентификацию в реестре с помощью GitHub-токена с правом `read:packages` и доступом к пакету. Для публикации workflow использует `GITHUB_TOKEN`; если публикация завершится ошибкой, проверьте, разрешена ли GitHub Actions запись пакетов.
4. В Dokploy создайте сервис **Compose** и укажите в качестве источника Compose файл `compose.yaml` этого репозитория. Если развёртываете приложение из другого репозитория или форка, задайте в Dokploy переменную `IMAGE` с адресом опубликованного образа, например `ghcr.io/owner/repository:latest` (имена образов GHCR записываются строчными буквами). Чтобы закрепить версию, используйте опубликованный тег `sha-<commit>`.
5. Добавьте домен для сервиса `web` в Dokploy, укажите порт контейнера **80** и запустите развёртывание. При следующих выпусках повторно разверните сервис с загрузкой обновлённого образа; если версия закреплена по SHA, сначала замените тег на новый. Настройте HTTPS для домена в Dokploy.

Compose-файл не публикует порт на хосте: Dokploy направляет трафик на порт 80 через свой прокси. Бэкенд является отдельным сервисом и не входит в этот Compose-файл.
