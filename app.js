var app = angular.module("tunePlayer", []);

app.controller("tunePlayerCtrl", function($scope){

    $scope.artistas = [];
    $scope.musicas = [];
    $scope.albuns = [];
    $scope.playlists = [];
    $scope.artistasFavoritos = [];
    $scope.artistaModal = "";
    $scope.playlistEmUso = "";

    //botao inicio

    $scope.exibeInicio = false;

    $scope.redirecionaInicio = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.pesquisaArtista = false;
        $scope.exibePlaylists = false;
        $scope.criaPlaylist = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.exibeInicio = true;
    }
    
    //adicionando artistas ao sistema
    
    $scope.adicionaArtista = false;

    $scope.redirecionaAddArtista = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.pesquisaArtista = false;
        $scope.exibePlaylists = false;
        $scope.exibeInicio = false;
        $scope.criaPlaylist = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = true;
    } 

    $scope.adicionarArtista = function(artista){
        if($scope.existeArtista(artista)){
            alert("Artista já existente no sistema!");               
        }
        else{
            artista.albuns = [];
            for (var i = 0; i < $scope.albuns.length; i++) {
                if($scope.albuns[i].artista === artista.nome){
                    artista.albuns.push($scope.albuns[i]);
                }
                
            }
            artista.ultimaMusica = "";
            $scope.artistas.push(artista);  
        }
        delete $scope.artista;
    }
        
    $scope.existeArtista = function(artista){
        for (var i = 0; i < $scope.artistas.length; i++) {
            if($scope.artistas[i].nome === artista.nome){
                return true;
            }   
        }
        return false;
    }

    //adicionando musicas ao sistema

    $scope.adicionaMusica = false;
    
    $scope.redirecionaAddMusica = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.pesquisaArtista = false;
        $scope.exibePlaylists = false;
        $scope.exibeInicio = false;
        $scope.criaPlaylist = false;
        $scope.adicionaArtista = false;
        $scope.adicionaMusica = true;
    } 

    $scope.adicionarMusica = function(musica){

        if($scope.existeAlbum(musica)){
            if(!$scope.jaExisteMusicaNoAlbum(musica)){
                $scope.musicas.push(musica);
                $scope.addMusicaNoAlbum(musica);
                alert("Música adicionada com sucesso!");
            }
            else{
                alert("Música já existente neste album!");
            }
        }
        else{
            $scope.criaAlbum(musica);
            alert("Música adicionada com sucesso!");
        }
        delete $scope.musica;
    }

    $scope.addMusicaNoAlbum = function(musica){
        for (var i = 0; i < $scope.albuns.length; i++) {
            if(musica.album === $scope.albuns[i].nome){
                $scope.albuns[i].musicas.push(musica);
            }    
        }
        delete $scope.musica;
    }
     
    $scope.existeAlbum = function(musica){
        for (var i = 0; i < $scope.albuns.length; i++) {
            if(musica.album === $scope.albuns[i].nome){
                return true;
            }  
        }
        return false;
    }

    $scope.jaExisteMusicaNoAlbum = function(musica){
        for (var i = 0; i < $scope.albuns.length; i++){
            if($scope.albuns[i].nome == musica.album){
                for (var j = 0; j < $scope.albuns[i].musicas.length; j++) {
                    if(musica.nome === $scope.albuns[i].musicas[j].nome){
                        return true;
                    }     
                }break;
            }
        }
        return false;
    }

    $scope.criaAlbum = function(musica){
        var album = new Object();
        album.nome = musica.album;
        album.artista = musica.artista;
        album.musicas = [];
        $scope.addAlbumAoArtista(album);
        album.musicas.push(angular.copy(musica));
        $scope.albuns.push(angular.copy(album));
        $scope.musicas.push(angular.copy(musica));
    }

    //pesquisar artistas

    $scope.pesquisaArtista = false;

    $scope.pesquisarArtista = function(artistaPesquisado){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.exibePlaylists = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = false;
        $scope.pesquisaArtista = true;

        $scope.artistasPesquisados = [];
        for (var i = 0; i < $scope.artistas.length; i++) {
            if($scope.artistas[i].nome.indexOf(artistaPesquisado.nome) !== -1){
                $scope.artistasPesquisados.push($scope.artistas[i]); 
                }     
            }
        delete $scope.artistaPesquisado;
    }

    $scope.transformaArtistaModal = function(artistaProcurado){
        $scope.artistaModal = artistaProcurado;
    }

    //adicionar  artista dos favoritos

    $scope.addAosFavoritos = function(artista){
        if($scope.jaEhFavorito(artista)){
            alert("Esse artista já é favorito!");
        }
        else{
            $scope.artistasFavoritos.push(angular.copy(artista));
        }
    }

    $scope.jaEhFavorito = function(artista){
        for (var i = 0; i < $scope.artistasFavoritos.length; i++) {
            if($scope.artistasFavoritos[i].nome === artista.nome){
                return true;
            }
        }
        return false;
    }

    //remover artista dos favoritos

    $scope.removerDosFavoritos = function(artista){
        for (var i = $scope.artistasFavoritos.length - 1; i >= 0; i--) {
            if($scope.artistasFavoritos[i].nome === artista.nome){
                $scope.artistasFavoritos.splice(i,1);
                alert("Artista removido da sua lista de favoritos!");
            }
        }
    }

    //relacionar artistas aos seus albuns

    $scope.addAlbumAoArtista = function(album){
        var naoAdicionado = true;
        for (var i = 0; i < $scope.artistas.length; i++) {
          if($scope.artistas[i].nome === album.artista && naoAdicionado){
            $scope.artistas[i].albuns.push(album);
            naoAdicionado = false;
          }
        }
    }

    // Add última musica ouvida do artista

    $scope.ultimaMusicaArtista = function(artista, musica){
        artista.ultimaMusica = musica;
        delete $scope.musica;
    }

    //exibe todos os artistas

    $scope.exibeArtistas = false;
    
    $scope.exibirArtistas = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = true;
        $scope.pesquisaArtista = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = false;
        $scope.exibePlaylists = false;
        $scope.mostraPlaylist = false;
    }

    // exibe artistas favoritos

    $scope.exibeArtistasFavoritos = false;

    $scope.exibirArtistasFavoritos = function(){
        $scope.exibeArtistas = false;
        $scope.pesquisaArtista = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = false;
        $scope.exibePlaylists = false;
        $scope.mostraPlaylist = false;
        $scope.exibeArtistasFavoritos = true;
    }

    //criar playlists

    $scope.criaPlaylist = false;
    
    $scope.redirecionaCriaPlaylist = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.pesquisaArtista = false;
        $scope.exibePlaylists = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = true;
    }

    $scope.criarPlaylist = function(playlist){
        if($scope.existePlaylist(playlist)){
            alert("Já existe uma playlist com esse nome!");
        }
        else{
            var novaPlaylist = new Object();
            novaPlaylist.nome = playlist.nome;
            novaPlaylist.musicas = [];
            $scope.playlists.push(novaPlaylist);
        }
        delete $scope.playlist;
    }

    $scope.existePlaylist = function(playlist){
        for (var i = 0; i < $scope.playlists.length; i++) {
            if($scope.playlists[i].nome == playlist.nome){
                return true;
            }
        }
        return false;
    }

    $scope.exibePlaylists = false;

    $scope.exibirPlaylists = function(){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.mostraPlaylist = false;
        $scope.pesquisaArtista = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = false;
        $scope.exibePlaylists = true;
    }

    $scope.mostraPlaylist = false;

    $scope.mostrarPlaylist = function(playlist){
        $scope.exibeArtistasFavoritos = false;
        $scope.exibeArtistas = false;
        $scope.pesquisaArtista = false;
        $scope.exibeInicio = false;
        $scope.adicionaMusica = false;
        $scope.adicionaArtista = false;
        $scope.criaPlaylist = false;
        $scope.exibePlaylists = false;
        $scope.mostraPlaylist = true;

        $scope.selecPlaylistEmUso(playlist);
    }

    //add musica na playlist

    $scope.addMusicaPlaylist = function(musicaAdd){
        
        if(!$scope.existeMusNaPlaylist(musicaAdd)){
            $scope.playlistEmUso.musicas.push(musicaAdd);
        }
        else{
            alert("Música já existente na playlist!");
        }

        delete $scope.musicaAdd;
    }

    $scope.existeMusNaPlaylist = function(musica){
        for (var i = 0; i < $scope.playlists.length; i++) {
            for (var j = 0; j < $scope.playlists[i].musicas.length; j++) {
                if($scope.playlists[i].musicas[j].nome === musica.nome){
                    return true;
                }
            }
        }
        return false;
    }

    $scope.selecPlaylistEmUso = function(playlist){
        $scope.playlistEmUso = playlist;
    }

    //remover playlist

    $scope.removerPlaylist = function(playlist){
        for (var i = $scope.playlists.length-1; i >= 0; i--) {
            if($scope.playlists[i].nome === playlist.nome){
                $scope.playlists.splice(i,1);
            }            
        }
    }

    $scope.removerMusicaDaPlaylist = function(musicaPlaylist){
        for (var i = $scope.playlistEmUso.musicas.length-1; i >= 0 ; i--) {
            if($scope.playlistEmUso.musicas[i].nome === musicaPlaylist.nome){
                $scope.playlistEmUso.musicas.splice(i,1);
            }
            
        }
    }

})