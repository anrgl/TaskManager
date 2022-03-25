# frozen_string_literal: true

puts 'Creating admin'
admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@email.com')
admin.password = 'admin'
admin.save

puts 'Creating managers and developers'
60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email#{i}@mail.gen"
  u.first_name = "FN#{i}"
  u.last_name = "LN#{i}"
  u.password = i.to_s
  u.save
end

puts 'Creating tasks'
20.times do |i|
  t = Task.new
  t.author = Manager.all.sample
  t.assignee = Developer.all.sample
  t.name = "TN#{i}"
  t.description = "TD#{i}"
  t.save
end