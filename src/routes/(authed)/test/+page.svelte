<h1>The button form attribute</h1>
<button type="submit" form="nameform" class="bg-red-500" value="Submit">Submit</button>

<form action="/action_page.php" method="POST" id="nameform">
	<dialog open>
		<label for="fname">First name:</label>
		<input type="text" id="fname" name="fname" /><br /><br />
		<label for="lname">Last name:</label>
		<input type="text" id="lname" name="lname" />
	</dialog>
</form>

<p>The button below is outside the form element, but still part of the form.</p>

