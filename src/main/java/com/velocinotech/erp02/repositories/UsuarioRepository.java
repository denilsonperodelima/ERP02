package com.velocinotech.erp02.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Usuario;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	@Transactional(readOnly=true)
	Usuario findByEmail(String email);  //o proprio spring faz a busca pelo campo desejado, neste caso email

	@Modifying(clearAutomatically = true)
	@Transactional
    @Query("UPDATE Usuario usu "
    		+ " SET usu.senha = :senha"
    		+ " WHERE usu.id = :usuarioId")
    int updateSenha(@Param("usuarioId") int usuarioId, @Param("senha") String senha );
	

	// retornando um int com a quantidade de linhas alteradas
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Usuario u "
    		+ "SET u.status = :status, "
    		+ "u.dataexpira = :dataexpira "
    		+ ",u.nome = :nome "
    		+ "WHERE u.id = :usuarioId")
    
    int updateUsuario(@Param("usuarioId") int usuarioId, @Param("status") String status
    		    , @Param("dataexpira") Date dataexpira
    		    , @Param("nome") String nome);
    
	@Transactional(readOnly=true)
    @Query("select id,  nome, email from Usuario usu  "
    		+ "   WHERE usu.idempresa = :idempresa"   
    		+ "     AND usu.nome like :nome%"     		
    		)
	List<Usuario> FindNomeLike	(@Param("idempresa") int idempresa, @Param("nome") String nome);	
	  	
}