class { 'redis::install': }

class { '::mongodb::server':
  bind_ip => '0.0.0.0'
}

redis::server { 'node':
  redis_ip => '0.0.0.0'
}

class { 'nodejs':
  make_install => false,
}

class { 'grunt': }

