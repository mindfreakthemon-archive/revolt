class grunt (
  $command = 'server'
) {
  Exec { path => '/usr/local/node/node-default/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' }

  exec { 'npm-install':
    command => 'npm install --no-bin-links',
    cwd => '/vagrant',
    creates => '/vagrant/node_modules',
    require => Class['nodejs']
  }

  exec { 'grunt-cli':
    command => 'npm install -g grunt-cli',
    unless => 'npm list -g grunt-cli',
    require => Exec['npm-install']
  }

  file { '/etc/init.d/grunt':
    ensure => file,
    mode => '0755',
    content => template('grunt/etc/init.d/grunt.erb'),
    notify => Service['grunt'],
  }

  service { 'grunt':
    ensure => 'running',
    enable => true,
    hasstatus => false,
    require => [Exec['grunt-cli'], File['/etc/init.d/grunt'], Service['redis-server_node']]
  }
}
