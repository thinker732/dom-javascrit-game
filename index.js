let randNumb = (numb = 256) => {
  const temp = Math.floor(Math.random() * numb);
  return temp;
};

let getColor = (op = 0.8) => {
  return `rgba(${randNumb()},${randNumb()},${randNumb()},${op})`;
};
//document.body.textContent = "Hello";

const elH1 = document.querySelector("h1");

const allH1 = document.querySelectorAll("h1");

elH1.textContent = "Click";
elH1.style.textAlign = "center";
elH1.addEventListener("click", (event) => {
  elH1.style.color = getColor();
  elH1.style.backgroundColor = getColor(0.5);
});
allH1[1].textContent = "second H1";
