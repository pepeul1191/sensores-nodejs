# encoding: utf-8

require_relative 'app'
require 'json'

def mandar
    """
    FORMATO DE DATO DE ENTRADA
        {
          'estacion_id':n,
          'momento':Date,
          'datos':[
            {'sensor_id':n,'dato':d},
            {'sensor_id':n,'dato':d},
            {'sensor_id':n,'dato':d},
          ]
        }
    """
    data = {
        'estacion_id' => 2,
        'momento' => DateTime.now,
        'datos' => [
          {'sensor_id' => 1,'dato' => 10},
          {'sensor_id' => 2,'dato' => 20},
          {'sensor_id' => 3,'dato' => 30},
        ]
      }
    #puts data
    RSpec.describe App do
        describe "1. Mandar dato de un sensor: " do
            it '1.1 Conexión con backend-sensores' do
                test =App.new('')
                test.servicios('backend', 'test/conexion')
                expect(test.response.code).to eq(200)
            end
            it '1.2 Guardar dato del sensor en base de datos' do
                url = 'sensor/grabar?data=' + data.to_json
                test = App.new(url)
                test.post()
                puts test.response.body
                expect(test.response.code).to eq(200)
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
