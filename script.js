let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  contrast: { value: 100, min: 0, max: 200, unit: "%" },

  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  Huerotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },

  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },

  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },

  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },

  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },

  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn");
let file = null;
let image = null;

const filersContainer = document.querySelector(".filters");
const presetsContainer = document.querySelector(".presets");

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = input.value;
    applyFilters();
  });
  return div;
}

function createPresetElement(name, preset) {}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );

    filersContainer.appendChild(filterElement);
  });
}

createFilters();

imageInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  if (!image) return;

  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.Huerotation.value}${filters.Huerotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
  `;

  canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },

    contrast: { value: 100, min: 0, max: 200, unit: "%" },

    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },

    Huerotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },

    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },

    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },

    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },

    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },

    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };

  applyFilters();

  filersContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    Huerotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    brightness: 90,
    contrast: 145,
    saturation: 125,
    Huerotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    saturation: 75,
    Huerotation: 350,
    blur: 0.3,
    grayscale: 10,
    sepia: 35,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 95,
    contrast: 110,
    saturation: 65,
    Huerotation: 0,
    blur: 0,
    grayscale: 25,
    sepia: 45,
    opacity: 100,
    invert: 0,
  },

  cinematic: {
    brightness: 85,
    contrast: 130,
    saturation: 85,
    Huerotation: 345,
    blur: 0,
    grayscale: 15,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    brightness: 105,
    contrast: 130,
    saturation: 0,
    Huerotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 115,
    contrast: 80,
    saturation: 70,
    Huerotation: 0,
    blur: 0,
    grayscale: 5,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturation: 110,
    Huerotation: 190,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warm: {
    brightness: 105,
    contrast: 105,
    saturation: 115,
    Huerotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  moody: {
    brightness: 75,
    contrast: 135,
    saturation: 70,
    Huerotation: 210,
    blur: 0,
    grayscale: 15,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  fadedFilm: {
    brightness: 110,
    contrast: 85,
    saturation: 80,
    Huerotation: 5,
    blur: 0.2,
    grayscale: 10,
    sepia: 25,
    opacity: 100,
    invert: 0,
  },

  dreamy: {
    brightness: 115,
    contrast: 90,
    saturation: 110,
    Huerotation: 340,
    blur: 1,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  noir: {
    brightness: 80,
    contrast: 160,
    saturation: 0,
    Huerotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  retro: {
    brightness: 105,
    contrast: 95,
    saturation: 85,
    Huerotation: 10,
    blur: 0,
    grayscale: 15,
    sepia: 30,
    opacity: 100,
    invert: 0,
  },

  cyberpunk: {
    brightness: 95,
    contrast: 140,
    saturation: 160,
    Huerotation: 280,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  soft: {
    brightness: 110,
    contrast: 90,
    saturation: 95,
    Huerotation: 0,
    blur: 0.5,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetbtn = document.createElement("button");
  presetbtn.classList.add("preset-btn");
  presetbtn.innerText = presetName;
  presetsContainer.appendChild(presetbtn);

  presetbtn.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });

    applyFilters();
  });
});
