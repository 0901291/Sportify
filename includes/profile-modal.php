<div id="chooseProfile" class="modal">
	<div class="modal-content">
  		<h4 class="center">Kies je profiel</h4>
        <em>Kies hieronder een profiel, of maak een nieuw profiel aan om Sportify met meerdere mensen te kunnen gebruiken!</em>
  		<ul id="profiles">
  			<li id="addProfile" class="profileBox">
  				<i class="mdi-content-add medium"></i>     				
  			</li>
  			<a href="logout.php">
  				<li id="logout-button" class="profileBox">
  					<i class="mdi-action-exit-to-app small"></i>
  				</li>
  			</a>
  			<li style="width: 100%;" class="center">
  				<div class="add row">
  					<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
				        <input id="profileName" type="text" class="validate">
				        <label for="profileName">Naam:</label>
					</div>
					<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
					    <input id="profileAge" type="text" class="validate">
					    <label for="profileAge">Leeftijd:</label>
					</div>
					<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
				    	<select id="profileGender" class="browser-default">
				     	 	<option value="" disabled selected>Geslacht</option>
				    	  	<option value="Male">Man</option>
				     	 	<option value="Female">Vrouw</option>
				    	</select>
				  	</div>
					<div id="addProfileButton" class="right next-button-container" data-transition="slide" data-page="7">
						<p class="waves-effect waves-orange btn-flat"> 
							Voeg toe 
							<span class="mdi-content-send"></span>
						</p>
					</div>
  				</div>
  			</li>
  		</ul>
	</div>
</div>