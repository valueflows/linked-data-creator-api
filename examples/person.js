var
  ld = require('./../src/index'),
  token = 'fill-this-in', // create one https://github.com/settings/tokens
  username = 'fill-this-in', // github
  dbUrl = 'mongodb://localhost/test';
  
ld.configure({
    token: token,
    dbUrl: dbUrl,
    username: username
}, function (err) {
    if (err) return console.log(err);
    
    ld.create({
         isSelf: true,
         attrs: {
             type: 'Person',
             url: "http://facebook.com/connor.turland",
             displayName: "Connor Turland",
             image: "https://pbs.twimg.com/profile_images/436050101539065856/QMGlzCUn_400x400.jpeg"
         }       
    }, function (err, entity) {
        if (err) console.log(err);
        else {
            console.log('woohoo', entity);
            console.log(entity.get('displayName'));
        }
    });
});