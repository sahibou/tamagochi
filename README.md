1
nom
prenom
mail
adress projet (saisie auto)
	site zonage du PLU

2
carte > zoom sur parcelle vue parcellaire
selection de la ou les parcelles 
	adresse doit corresp a la parcelle sinon ca bloque
validation parcelle et adresse

3
selection du batiment qui fera lobjet des travaux ENTOURER le batument ou construction concernée




> mettre a dispo les données
	
+ données etape 1
+ numero de parcelle (et sa surface cadastrale et ladresse du cadastre qui est un peu diff des fois)
+ le zonage du PLU (avec geoportail)
++ la page reglement et plan de zonage du PLU de la ville en question
+ screenshot de letape 3

## API cadastre 
https://www.data.gouv.fr/fr/dataservices/api-carto-module-rpg/
## API address
https://adresse.data.gouv.fr/outils/api-doc/adresse
# API autocompletion
https://data.geopf.fr/geocodage/completion
## all  API Look4 Géoportail 
https://www.data.gouv.fr/fr/dataservices/api-look4-geoportail/


## API cadastre 
https://apicarto.ign.fr/api/doc/cadastre.yml
https://converter.swagger.io/#/Converter/convertByUrl
docker run --rm --net=host -u="$(id -u)" -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:3.0.68 generate \
		-i /local/projects/api-cadastre-parcelle/swagger.json \
		-l typescript-angular \
		-o /local/projects/api-cadastre-parcelle/src \
		--additional-properties ngVersion=19.2.6