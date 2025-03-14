<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data: number[] = [50, 600];
	export let labels: string[] = ['Free', 'Used'];
	export let backgroundColors: string[] = ['#303030', '#f2f2f2'];
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
				chartArea: { width, height }
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

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'doughnut',
				data: {
					labels: labels,
					datasets: [
						{
							data: data,
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
	});
</script>

<canvas bind:this={canvas}></canvas>
