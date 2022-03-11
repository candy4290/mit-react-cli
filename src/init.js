const which = require('which')

function runCmd(cmd, args, fn,targetPath) {
  args = args || []
  var runner = require('child_process').spawn(cmd, args, {
    cwd: targetPath,
    stdio: 'inherit'
  })
  runner.on('close', function (code) {
    if (fn) {
      fn(code)
    }
  })
}

function findGit() {
  var gits = process.platform === 'win32' ? ['git'] : ['git']
  for (var i = 0; i < gits.length; i++) {
    try {
      which.sync(gits[i])
      return gits[i]
    } catch (e) {
    }
  }
  throw new Error('please install git')
}

module.exports = function (installArg = [ 'init' ]) {
  const git = findGit()
  return function (done, targetPath){
    runCmd( which.sync(git),installArg, function () {
        done && done()
     }, targetPath)
  }
}
