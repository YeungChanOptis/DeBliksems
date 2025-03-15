<script lang="ts">
    import {onMount} from 'svelte';
    import Chart from 'chart.js/auto';

    export let totalsPerType: { [key: string]: number };

    const backgroundColors: string[] = ['#303030', '#f2f2f2', '#aaf2f2', '#ccf2cc', '#f25552', '#f2f15f'];
    const options: Chart.ChartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#333',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: €${value.toFixed(2)}`;
                    }
                }
            }
        }
    };

    let chart: Chart | undefined;
    let canvas: HTMLCanvasElement | null = null;

    const centerTextPlugin = {
        id: 'centerText',
        afterDraw(chart: Chart) {
            const {
                ctx,
                chartArea: {width, height}
            } = chart;
            ctx.save();
            ctx.font = '20px Arial';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Budget', width / 2, height / 2);
            ctx.restore();
        }
    };

    function updateChart() {
        if (canvas) {
            if (chart) {
                chart.destroy();
            }

            chart = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(totalsPerType),
                    datasets: [
                        {
                            data: Object.values(totalsPerType),
                            backgroundColor: backgroundColors,
                            borderColor: '#fff',
                            borderWidth: 1,
                            borderRadius: 3
                        }
                    ]
                },
                options: options,
                plugins: [centerTextPlugin]
            });
        }

        return () => {
            chart?.destroy();
        };
    }

    $: {
        if (totalsPerType) {
            updateChart();
        }
    }


    onMount(() => {
        updateChart();
    });


</script>

<canvas bind:this={canvas}></canvas>
