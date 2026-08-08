const rankingRows = Object.freeze({
  Alpha: { base: 47.8, slope: 5.2, uncertainty: 11 },
  Beta: { base: 52.75, slope: 7.25, uncertainty: 19.25 },
  Gamma: { base: 38, slope: 2, uncertainty: 22.25 },
});

const etaControl = document.querySelector("#eta");
const etaOutput = document.querySelector("#eta-output");
const liveTarget = document.querySelector("#live-results");

if (etaControl && etaOutput && liveTarget) {
  const renderRanking = () => {
    const eta = Number(etaControl.value);
    etaOutput.value = eta.toFixed(2);

    const rows = Object.entries(rankingRows)
      .map(([name, row]) => ({
        name,
        score: row.base + row.slope * eta,
        uncertainty: row.uncertainty,
      }))
      .sort((left, right) => right.score - left.score);

    liveTarget.innerHTML = rows
      .map(
        (row, index) => `
          <div class="live-row">
            <b>${index + 1}. ${row.name}</b>
            <span class="track" aria-hidden="true">
              <span class="fill" style="width:${((row.score / 65) * 100).toFixed(2)}%"></span>
            </span>
            <strong>${row.score.toFixed(3)}</strong>
            <small>Uncertainty ${row.uncertainty.toFixed(2)}</small>
          </div>`,
      )
      .join("");
  };

  etaControl.addEventListener("input", renderRanking);
  renderRanking();
}
