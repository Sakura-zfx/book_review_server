import {
  exec
} from 'child_process'

const arg1 = 'hello'
const arg2 = 'world'

const fileName = 'test.py'

exec(`python ${fileName} ${arg1} ${arg2}`, function (err, stdout, stderr) {
  if (err) {
    console.log('stderr', err);
  }
  if (stdout) {
    console.log('stdout', stdout);
  }
})