# Welcome to Worth-It!

Worth-It allows users to make a decision towards some deals on the French website [leboncoin.fr](https://www.leboncoin.fr/) ,which is a famous commercial adverts platform, by comparing between the price of the offer on LBC and the price for new found on the price comparison service [Idealo.fr](https://www.idealo.fr/).
The application still provides the basic services for an E-commerce website such as placing and advert, messaging, commenting, order and payment services.

The project is hosted on [Github](https://github.com/Marouen2110/Worth-It) in Mono-Repo approach.

---

## Motivation

The motivation behind the creation of this project is to offer a simple experience for those who like to search for a good deal in the used tool for sale compartment and propose an ecosystem for those who want to sell their goods.

---

## Technologies for developing Worth-It - API REST

Worth-It is has a microservices approach using an event based communication async design pattern as the desired solution to have a scalable, easy to maintain enterprise application. Tha application is packages on containers hosted on [Docker-Hub](https://hub.docker.com/u/marouenslaimia) and runs on a Kubernetes clusters.
The back-end is built with TypeScript and NodeJs with a shared library hosted on [npmjs](https://www.npmjs.com/package/@worth-it/common). Each microservice is connected to a Mongodb database. The role of the event bus is assured by Nats Streaming Service with its library developed in javascript.
The front-end is built with Angular 9.

---

## CI/CD and Deployment

The continuos integration/delivery and deployment is assured by github actions. The approach used in this project is workflow that is triggered with pull requests which launch tests script followed by a build and deployment scripts. All scripts is saved on [workflows](https://github.com/Marouen2110/Worth-It/tree/master/.github/workflows) directory.

This application is orchestrated by Kubernetes with an Nginx ingress for a load balancer and hosted on [DigitalOcean](https://www.digitalocean.com/). Kubernetes manifests deployments are on [infra](https://github.com/Marouen2110/Worth-It/tree/master/infra) directory.

---

## API Dependencies

This project uses some external Apis such as : [Scraping-bot](https://www.scraping-bot.io/), [Price Analytics](https://rapidapi.com/3b-data-3b-data-default/api/price-analytics/) and [Stripe Api](https://stripe.com/). You need to create a private accounts in those Apis to use Worth-it in it full potential.

---

## Credits

This project is made possible thanks to [Stephen Grider](https://github.com/StephenGrider) and his course hosted on [Udemy](https://www.udemy.com/course/microservices-with-node-js-and-react/)

---

## License

> You can check out the full license [here](https://github.com/Marouen2110/Worth-It/LICENSE)

This project is licensed under the terms of the **MIT** license.

MIT © [Marouen Slaimia](https://github.com/Marouen2110)
