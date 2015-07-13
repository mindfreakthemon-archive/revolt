Vagrant.configure('2') do |config|
  config.vm.box = 'parallels/centos-6.6'

  config.vm.network 'forwarded_port', guest: 8080, host: 8080
  config.vm.network 'forwarded_port', guest: 5858, host: 5858
  config.vm.network 'forwarded_port', guest: 6379, host: 6379
  config.vm.network 'forwarded_port', guest: 27017, host: 27017

  config.vm.provision 'playbook', type: 'ansible' do |ansible|
    ansible.playbook = 'provisioning/playbook.yml'
  end

  config.vm.provider 'parallels' do |v, override|
    v.name = 'Revolt'
    v.memory = 2048
    v.cpus = 1
    v.customize ['set', :id, '--on-window-close', 'keep-running']
    v.optimize_power_consumption = false
    v.update_guest_tools = false
  end

  config.vm.network 'private_network', ip: '10.211.55.13'
end
