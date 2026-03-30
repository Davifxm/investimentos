let myChart;

const assets = [
    { name: 'Poupança', rate: 0.005 }, // 0.5% am
    { name: 'Tesouro Selic', rate: 0.0089 },
    { name: 'Cripto', rate: 0.015 }
];

function calculate() {
    const p = parseFloat(document.getElementById('initial').value);
    const pmt = parseFloat(document.getElementById('monthly').value);
    const t = parseInt(document.getElementById('years').value) * 12;

    const labels = Array.from({length: t/12 + 1}, (_, i) => i);
    const datasets = assets.map(asset => {
        let data = [p];
        for(let m=1; m<=t; m++) {
            let balance = p * Math.pow(1 + asset.rate, m) + pmt * (Math.pow(1 + asset.rate, m) - 1) / asset.rate;
            if(m % 12 === 0) data.push(balance.toFixed(2));
        }
        return { label: asset.name, data: data, fill: false, borderColor: '#' + Math.floor(Math.random()*16777215).toString(16) };
    });

    updateUI(datasets, p, pmt, t);
    renderChart(labels, datasets);
}

function updateUI(datasets, p, pmt, t) {
    const total = p + (pmt * t);
    document.getElementById('totalInvested').innerText = `R$ ${total.toLocaleString()}`;
    const lastValues = datasets.map(d => parseFloat(d.data[d.data.length - 1]));
    document.getElementById('bestReturn').innerText = `R$ ${Math.max(...lastValues).toLocaleString()}`;
    document.getElementById('worstReturn').innerText = `R$ ${Math.min(...lastValues).toLocaleString()}`;
}

function renderChart(labels, datasets) {
    const ctx = document.getElementById('investmentChart').getContext('2d');
    if(myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

calculate(); // Inicialização automática
