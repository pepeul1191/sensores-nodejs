# encoding: utf-8

require_relative 'app'
require 'json'

def mandar
    file = File.new("data/sensor.txt", "r")
    arreglo_sensores = []
    while (line = file.gets)
        data_json_string = line
        arreglo_sensores.push(data_json_string)
    end
    #puts "1+++++++++++++++++++++++++++++++++++++++"
    #puts arreglo_sensores.size
    #puts "2+++++++++++++++++++++++++++++++++++++++"
    RSpec.describe App do
        describe "1. Mandar dato de un sensor: " do
            arreglo_sensores.each do |sensor|
                it '1.1 Conexión con backend-sensores' do
                  test =App.new('')
                  test.servicios('backend', 'test/conexion')
                  expect(test.response.code).to eq(200)
                end
                it '1.2 Guardar dato del sensor en base de datos' do
                  url = 'sensor/grabar?data='+sensor
                  test = App.new(url)
                  test.post()
                  expect(test.response.code).to eq(200)
                end
            end
        end
    end
end

def listar
    RSpec.describe App do
        describe "1. Listar información grabada de sensores: " do
          it '1.1 Conexión con backend-sensores' do
            test =App.new('')
            test.servicios('backend', 'test/conexion')
            expect(test.response.code).to eq(200)
          end
          it '1.2 Listar los datos registrados de los sensors' do
              url = 'sensor/listar'
              test =App.new(url)
              test.get()
              expect(test.response.code).to eq(200)
          end
        end
    end
end

mandar
#listar
