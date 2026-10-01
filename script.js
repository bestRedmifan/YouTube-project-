const show = document.getElementById("show");
const status = document.getElementById("status");
const player = document.getElementById("player");
const video = document.getElementById("video");

show.onclick = async () => {
  show.disabled = true;
  status.textContent = "Connecting to server...";
  player.style.display = "none";

  try {
    const response = await fetch("/api/random-video", {
      cache: "no-store"
    });

    if (!response.ok) throw new Error();

    const data = await response.json();

    if (!data.id) throw new Error();

    video.src = `https://www.youtube.com/embed/${data.id}?autoplay=1`;
    player.style.display = "block";
    status.textContent = "Random video loaded.";
  } catch {
    video.src = "";
    player.style.display = "none";
    status.textContent =
      "It looks like us project is failed we have try or ignore";
  }

  show.disabled = false;
};
