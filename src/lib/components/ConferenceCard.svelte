<script lang="ts">
  export let name: string;
  export let description: string;
  export let date: string;
</script>

<div class="card w-96 bg-base-100 shadow-xl m-4">
  <div class="card-body">
    <h2 class="card-title">{name}</h2>
    <p>{description}</p>
    <div class="flex items-center gap-2 mt-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{date}</span>
    </div>
    <div class="card-actions justify-end mt-4">
      <button class="btn btn-primary" on:click={() => alert(`Requesting attendance for ${name}`)}>
        Request Attendance
      </button>
    </div>
  </div>
</div>