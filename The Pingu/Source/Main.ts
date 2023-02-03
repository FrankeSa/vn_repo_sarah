namespace SarahsNovel {
  export import ƒ = FudgeCore;
  export import ƒS = FudgeStory;

  console.log("Scene_1 In deinem Zimmer is starting");
  // Menu
  let gameMenu: ƒS.Menu;
  let menuIsOpen: boolean = true;
  export let affectionScore: number;

  let inGameMenuBtn = {
    save: "Save",
    load: "Load",
    close: "Close",
    credits: "Credits"
  };

  export let transitions = {

    beginning: {
      duration: 3,
      alpha: "Transitions/WipesAndOther/circlewipe-ccw.jpg",
      edge: 2
    },
    crossingGeneral: {
      duration: 4,
      alpha: "Transitions/WipesAndOther/17.png",
      edge: 1
    },
    fadeSky: {
      duration: 4,
      alpha: "Transitions/WipesAndOther/4.jpg",
      edge: 1
    },
    swirl: {
      duration: 4,
      alpha: "Transitions/Others/swirl.png",
      edge: 1
    }

  };

  export let audio = {
    //background themes
    nursery: "Audio/birds_in_the_morning.mp3",
    cityTraffic: "Audio/city_traffic_outdoor.mp3",
    //SFX
    shipHorn: "Audio/ship_horn.mp3"
  };

  export let locations = {
    yourRoom: {
      name: "in your nursery",
      background: "Images/Hintergruende/kinderzimmer.png"
    },
    getLunchbox: {
      name: "get your lunchbox from your Grandmother",
      background: "Images/Hintergruende/oma_mit_kind_vesper.png"
    },
    meetThePenguin: {
      name: "you meet the penguin in front of your door",
      background: "Images/Hintergruende/an_der_haustuer.png"
    },
    wayToSchool: {
      name: "walk to school with penguin",
      background: "Images/Hintergruende/schulweg.png"
    },
    schoolyard: {
      name: "penguin on schoolyard",
      background: "Images/Hintergruende/auf_dem_schulhof.png"
    },
    nightSky: {
      name: "you look in the night sky",
      background: "Images/Hintergruende/nachthimmel.png"
    },
    lafOffice: {
      name: "at the lost and found office",
      background: "Images/Hintergruende/im_fundbuero.png"
    },
    badEnding: {
      name: "the penguin is captured",
      background: "Images/Hintergruende/pinguin_im_kaefig.png"
    },
    atThePark: {
      name: "you and the penguin at the park",
      background: "Images/Hintergruende/im_park.png"
    },
    atTheHarbor: {
      name: "you and the penguin at the harbor",
      background: "Images/Hintergruende/am_hafen.png"
    },
    packSuitcase: {
      name: "get ready for adventure",
      background: "Images/Hintergruende/koffer_packen.png"
    },
    atSee: {
      name: "you and the penguin on your way to the South Pole",
      background: "Images/Hintergruende/meer.png"
    },
    bigWave: {
      name: "big Wave",
      background: "Images/Hintergruende/große_welle.png"
    },
    atSouthPole: {
      name: "SouthPole",
      background: "Images/Hintergruende/am_suedpol.png"
    },
    happyEnd: {
      name: "Happy End",
      background: "Images/Hintergruende/happy_end.png"
    },
    bgBrown: {
      name: "brown background",
      background: "Images/Hintergruende/bg_allgemein.png"
    },
    bgBlue: {
      name: "blue background",
      background: "Images/Hintergruende/bg_rueckkehr_pinguin.png"
    }

  };

  export let characters = {
    narrator: {
      name: "Erzähler"
    },
    protagonist: {
      name: "Protagonist"
    },
    oma: {
      name: "Oma"
    },
    kind: {
      name: "Kind",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        reading: "Images/Charaktere/Kind/kind_liest_buch.png",
        idea: "Images/Charaktere/Kind/kind_idee.png"
      }
    },
    pinguin: {
      name: "",
      origin: ƒS.ORIGIN.BOTTOMRIGHT,
      pose: {
        front: "Images/Charaktere/Pinguin/pinguin.png",
        side: "Images/Charaktere/Pinguin/pinguin_seitlich.png",
        sad: "Images/Charaktere/Pinguin/pinguin_traurig.png",
        happy: "Images/Charaktere/Pinguin/ruerckkehr_pinguin.png"
      }
    }
  };

  //Data that will be saved in game progress

  export let dataForSave = {
    nameProtagonist: "",
    affectionScore: 0
  };

  export let items = {
    firstItem: {
      name: "Regenschirm ",
      description: "für stürmische Zeiten ",
      image: "Images/Equipment/schirm.png",
      static: false //wenn true dann kann das Item verwendet werden
    },
    secondItem: {
      name: "Taschenlampe ",
      description: "bringt Licht ins Dunkle ",
      image: "Images/Equipment/taschenlampe.png",
      static: false
    },
    thirdItem: {
      name: "Schaal ",
      description: "hält schön warm ",
      image: "Images/Equipment/schaal.png",
      static: false
    }
  };

  // export function animation(): ƒS.AnimationDefinition {
  //   return {
  //     start: { translation: ƒS.positions.bottomcenter, color: ƒS.Color.CSS("blue", 1) },
  //     end: { translation: ƒS.positions.bottomright, color: ƒS.Color.CSS("blue", 0) },
  //     duration: 3,
  //     playmode: ƒS.ANIMATION_PLAYMODE.LOOP

  //   };

  // }

  export function moveBackAnimation(): ƒS.AnimationDefinition {
    return {
      start: { translation: ƒS.positionPercent(50, 74) },
      end: { translation: ƒS.positionPercent(49, 74) },
      duration: 2,
      playmode: ƒS.ANIMATION_PLAYMODE.PLAYONCE
    };
  }


  export function credits(): void {
    ƒS.Text.print("Hier könnten Ihre Credits stehen");

  }

  async function hdlMenuBtn(_option: string): Promise<void> {
    console.log(_option);
    switch (_option) {
      case inGameMenuBtn.save:
        await ƒS.Progress.save();
        break;
      case inGameMenuBtn.load:
        await ƒS.Progress.load();
        break;
      case inGameMenuBtn.close:
        gameMenu.close();
        menuIsOpen = false;
        break;
      case inGameMenuBtn.credits:
        credits();
    }
  }


  // Menu Shortcuts
  document.addEventListener("keydown", hdlKeyPress);
  async function hdlKeyPress(_event: KeyboardEvent): Promise<void> {

    switch (_event.code) {

      case ƒ.KEYBOARD_CODE.S:
        console.log("Save Scene");
        await ƒS.Progress.save();
        break;
      case ƒ.KEYBOARD_CODE.L:
        console.log("Load Scene");
        await ƒS.Progress.load();
        break;
      case ƒ.KEYBOARD_CODE.C:
        console.log("Show Credits");
        await credits();
        break;
      case ƒ.KEYBOARD_CODE.M:

        if (menuIsOpen) {
          console.log("Menu is closed");
          gameMenu.close();
          menuIsOpen = false;
        }

        else {
          console.log("Menu is open");
          gameMenu.open();
          menuIsOpen = true;
        }
        break;
    }
  }


  window.addEventListener("load", start);


  function start(_event: Event): void {
    gameMenu = ƒS.Menu.create(inGameMenuBtn, hdlMenuBtn, "gameMenuCSS");
    hdlMenuBtn("Close");


    //****Szenen Hirarchie

    let scenes: ƒS.Scenes = [
      // { id: "s00", scene: Scene00, name: "Vorwort", next: "s01" },
      { id: "s01", scene: Scene01, name: "In deinem Kinderzimmer", next: "s02" },
      { id: "s02", scene: Scene02, name: "Oma überreicht dir deine Brotbox", next: "s03" },
      { id: "s03", scene: Scene03, name: "An der Haustür", next: "s04" },
      { id: "s04", scene: Scene04, name: "Schulweg", next: "s05" },
      { id: "s05", scene: Scene05, name: "Auf dem Schulhof", next: "s06" },
      { id: "s06", scene: Scene06, name: "Der traurige Pinguin", next: "s07" },
      { id: "s07", scene: Scene07, name: "Blick in den Sternenhimmel", next: "s08" },
      { id: "s08", scene: Scene08, name: "Im Fundbüro", next: "s09" }


    ];

    let uiElement: HTMLElement = document.querySelector("[type=interface]");
    dataForSave = ƒS.Progress.setData(dataForSave, uiElement);

    // start the sequence
    ƒS.Progress.go(scenes);
  }






}