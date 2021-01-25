import * as shell from 'shelljs';

shell.cp('-R', 'server/public/', 'build/server/');
shell.cp('-R', 'server/views/', 'build/server/');
