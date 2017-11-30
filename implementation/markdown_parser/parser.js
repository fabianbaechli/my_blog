var md = window.markdownit();

window.onload = () => {
  document.getElementById("parse_input").addEventListener("click", (e) => {
    var result = md.render(document.getElementById("input_field").value);
    console.log(result)
  })
}
