import { IChurch } from '../interfaces/IChurch';

export const churches: IChurch[] = [
  {
    identifier: 'plenitude-sede',
    name: 'Plenitude Sede - Salto',
    localization: 'Av dos Três Poderes, 305',
    complement: 'Central Parque',
    image: '/assets/pages/places/salto.webp',
    imageDescription: "Plenitude Sede Salto",
    collageImage: '/assets/pages/places/collages/salto.webp',
    description: 'A Plenitude Sede é a igreja principal em relação as outras plenitudes, e tem como propósito conduzir pessoas a um relacionamento intenso com Deus.',
    worshipServices: [
      { weekDay: 0, times: ['09h00', '19h00'] },
      { weekDay: 3, times: ['20h00'] },
    ],
    leadership: [
      {
        id: 1,
        name: 'Apóstolo Diego Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/main/apostolo_diego/03.webp'
      },
      {
        id: 2,
        name: 'Bispa. Patricia Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/main/bispa_patricia/02.webp'
      }
    ],
  },
  {
    identifier: 'plenitude-indaiatuba',
    name: 'Plenitude Indaiatuba',
    localization: 'Av. Estrada do Sapezal, 764',
    complement: 'Carlos Aldrovandi',
    image: '/assets/pages/places/indaiatuba.webp',
    imageDescription: "Plenitude Indaiatuba",
    collageImage: '/assets/pages/places/collages/salto.webp',
    description: 'Somos uma Igreja situada em Indaiatuba com o propósito de aproximar as pessoas de Deus',
    worshipServices: [
      { weekDay: 0, times: ['19h00'] },
      { weekDay: 2, times: ['19h30'] },
      { weekDay: 4, times: ['19h30'] },
    ],
    leadership: [
      {
        id: 1,
        name: 'Apóstolo Diego e Bispa Patricia Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/churches/main.webp'
      },
      {
        id: 2,
        name: 'Pr. Emerson e Pra. Kátia',
        position: 'Liderança Sênior Local',
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
      }
    ],
  },
  {
    identifier: 'plenitude-itupeva',
    name: 'Plenitude Itupeva',
    localization: 'Rua Geraldo Ferraz, 310',
    complement: 'Nova Monte Serrat',
    image: '/assets/pages/places/itupeva.webp',
    imageDescription: "Plenitude Itupeva",
    collageImage: '/assets/pages/places/collages/salto.webp',
    description: 'Somos uma Igreja situada em Itupeva com o propósito de aproximar as pessoas de Deus',
    worshipServices: [
      { weekDay: 0, times: ['19h00'] },
      { weekDay: 2, times: ['19h30'] },
      { weekDay: 4, times: ['19h30'] },
    ],
    leadership: [
      {
        id: 1,
        name: 'Apóstolo Diego e Bispa Patricia Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/churches/main.webp'
      },
      {
        id: 2,
        name: 'Pr. Emerson e Pra. Kátia',
        position: 'Liderança Sênior Local',
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
      }
    ],
  },
  {
    identifier: 'plenitude-jundiai',
    name: 'Plenitude Jundiaí',
    localization: 'Rua Roberto Gaspari, 06',
    complement: 'Fazenda Grande',
    image: '/assets/pages/places/jundiai.webp',
    imageDescription: "Plenitude Jundiaí",
    collageImage: '/assets/pages/places/collages/salto.webp',
    description: 'Somos uma Igreja situada em Jundiaí com o propósito de aproximar as pessoas de Deus',
    worshipServices: [
      { weekDay: 0, times: ['19h00'] },
      { weekDay: 2, times: ['19h30'] },
      { weekDay: 4, times: ['19h30'] },
    ],
    leadership: [
      {
        id: 1,
        name: 'Apóstolo Diego e Bispa Patricia Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/churches/main.webp'
      },
      {
        id: 2,
        name: 'Pr. Emerson e Pra. Kátia',
        position: 'Liderança Sênior Local',
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
      }
    ],
  },
  {
    identifier: 'plenitude-tanabi',
    name: 'Plenitude Tanabi',
    localization: 'Av. Ulisses Guimarães, 54',
    complement: 'Nova Tanabi',
    image: '/assets/pages/places/tanabi.webp',
    imageDescription: "Plenitude Tanabi",
    collageImage: '/assets/pages/places/collages/salto.webp',
    description: 'Somos uma Igreja situada em Tanabi com o propósito de aproximar as pessoas de Deus',
    worshipServices: [
      { weekDay: 0, times: ['19h00'] },
      { weekDay: 2, times: ['19h30'] },
      { weekDay: 4, times: ['19h30'] },
    ],
    leadership: [
      {
        id: 1,
        name: 'Apóstolo Diego e Bispa Patricia Melo',
        position: 'Liderança Sênior',
        image: '/assets/leadership/churches/main.webp'
      },
      {
        id: 2,
        name: 'Pr. Emerson e Pra. Kátia',
        position: 'Liderança Sênior Local',
        image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
      }
    ],
  },
]
