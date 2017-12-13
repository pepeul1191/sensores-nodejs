## Happi JS - EJDB

Instlación de software y dependencias. Adicionalmente hay que tener instalado NodeJS.

    $ sudo add-apt-repository ppa:adamansky/ejdb
    $ sudo apt-get update
    $ sudo apt-get install ejdb ejdb-dbg gcc clang cmake zlib1g-dev 
    $ git clone https://github.com/Softmotions/ejdb.git
    $ cd ejdb
    $ mkdir build
    $ cd build
    $ cmake -DCMAKE_BUILD_TYPE=Release ../
    $ make 
    $ sudo make install
    $ npm install -g ejdb

### Cliente EJDB en la terminal:

+ Acceder al cliente:

    $ ejdb

+ Abrir base de datos:

    ejdb > db.open('mydb');

+ Obtener la información de colecciones:

    ejdb> db.getDBMeta();

+ Consultar todos los registros:

    ejdb> db.find('colección');

---

Fuentes:

+ https://github.com/davidenq/hapi-routes-loader
+ http://ejdb.org/doc/install/ubuntu.html
+ https://github.com/Softmotions/ejdb-ruby
+ http://ejdb.org/doc/cli.html