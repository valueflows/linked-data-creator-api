# linked-data-creator-api

Enable github as database for json-ld data, with an easy to use api for manipulating the open graph


## Concept:
Enable a distributed data store. Use github as the authentication backbone and data storage. Create template json-ld files according to the schemas defined elsewhere in value-flows, and enable the easy creation and saving of new entities as json files in github repositories. This enables that person to finely tune the access permissions of their open data. In order to maintain quick access to the database of entities, a record is also stored in a mongo db database with the name, type, and endpoint values. 

## Why?
Github has enabled api access to git, and git is a powerful tool for distributing our open data. It removes work in the authentication realm, as well as databases.


## Example: 
running the code in /examples/person.js creates a new repo, which has a json-ld file in it. You can see it here: https://github.com/Connoropolous/open-data-self

Hylo would write 'intention' 'offer' 'request' 'project' and 'event' types to the users own github account as repos with a json file representing the resource. 

Metamaps would write any of its 'topic' objects to the users own github account as repos. When you open a topic card, it could fetch the whole resource at the endpoint that it had stored locally in its mongodb database. 


# API
Written in node.js callback style

### configure
Pass a github token, and a URL to access a mongo database at

### search
Find entities quickly by querying the mongo table of entities.

### create
Create a new entity in the graph. Store a reference to the entity (type, name, and endpoint) in the mongo table of entities.

### get
Pass an endpoint, or a mongo entity ID, and fetch the entity from that endpoint.


## Class: Entity
### get
Retrieve the value of a certain property belonging to the entity.

### set
Do a programmatic git commit and change the key/values in the github file to your new values. If you don't have write permissions, fork the repo, and programmatically create a Pull Request.

### delete
Delete the entity, if you have permission to.
