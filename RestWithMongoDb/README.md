
##Mongo DB Cluster is created on AWS

# Get the latest MongoDB Shell compatible with your cluster (4.2.0)
brew install mongodb/brew/mongodb-community-shell

# Run your connection string in your command line
mongo "mongodb+srv://mymongodb-njb04.mongodb.net/test" --username lavkherwa

# Cluster access link
Cluster Name: MyMongoDB
https://cloud.mongodb.com/v2/5d8deb2ed5ec136cb78bb220#clusters



//// NODE BOILER PLATE ////
# Application descriptor file [package.json]
command: npm init -y

# Add dependencies to our Application
command: npm i restify restify-errors mongoose mongoose-timestamp

# Add Dev dependencies
command: npm i -D nodemon

## Delete node modules folder
rm -rf node_modeules


//// RUN ////
npm run dev [This will run nodemon, to stop press 'control + c' on mac]
