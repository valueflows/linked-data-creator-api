# linked-data-creator-api

Enable github as database for json-ld data, with an easy to use api for manipulating the open graph


Concept:
Enable a distributed data store. Use github as the authentication backbone and data storage. Create template json-ld files according to the schemas defined elsewhere in value-flows, and enable the easy creation and saving of new entities as json files in github repositories. This enables that person to finely tune the access permissions of their open data. In order to maintain quick access to the database of entities, a record is also stored in a mongo db database with the name, type, and endpoint values. 

Why?
Github has enabled api access to git, and git is a powerful tool for distributing our open data. It removes work in the authentication realm, as well as databases.


Example: running the code in /examples/person.js creates a new repo, which has a json-ld file in it. You can see it here: HTTPS://github.com/Connoropolous/open-data-self


API
Written in node.js callback style

## search 

## create

## get

## update

## delete


Class: Entity
## get

## set

## delete
