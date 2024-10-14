// ดึงข้อมูลจาก table มาแสดงผลในกราฟ
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const chartTypeSelector = document.getElementById('chart-type');
    let chart;
    
    // ฟังก์ชันสําหรับสร้างข้อมูลกราฟ
    const getChartData = () => {
    const labels = [];
    const sales = [];
    document.querySelectorAll('#data-grid tbody tr').forEach(row => {
    labels.push(row.cells[1].textContent); // ดึงวันที่จากแถว
    sales.push(parseInt(row.cells[2].textContent)); // ดึงยอดขายจากแถว
    });
    return { labels, sales };
    
    };
    
    // ฟังก์ชันสําหรับอัพเดทกราฟ
    const updateChart = (chartType) => {
    if (chart) chart.destroy(); // ลบกราฟเดิมก่อนสร้างใหม่
    
    const chartData = getChartData();
    chart = new Chart(ctx, {
    type: chartType,
    data: {
    labels: chartData.labels,
    datasets: [{
    label: 'Sales',
    data: chartData.sales,
    borderColor: 'rgba(75, 192, 192, 1)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderWidth: 1,
    }]
    },
    options: {
    scales: {
    
    y: {
    beginAtZero: true
    }
    }
    }
    });
    };
    
    // สร้างกราฟเริ่มต้นเป็นกราฟเส้น
    updateChart('line');
    
    // เมื่อมีการเปลี่ยนชนิดกราฟ
    chartTypeSelector.addEventListener('change', (e) => {
    updateChart(e.target.value);
    });
    });