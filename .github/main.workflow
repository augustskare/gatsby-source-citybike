workflow "Publish on release" {
  resolves = ["Publish to npm"]
  on = "release"
}

action "Publish to npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
