package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
	
	@Transactional(readOnly=true)
    @Query("select id,  nome, documento, cidadenf, ufnf  from Pessoa pess  "
    		+ "   WHERE pess.empresaid = :idempresa"   
    		+ "     AND pess.tiporelacionamento = :tiporelacionamento"   
    		+ "     AND pess.nome like :nome%"     		
    		)
	List<Pessoa> FindNomeLike	(@Param("idempresa") int idempresa, @Param("tiporelacionamento") String tiporelacionamento
		                       , @Param("nome") String nome);	
	
	@Transactional(readOnly=true)
    @Query("select id, nome, documento, cidadenf, ufnf from Pessoa pess  "
    		+ "   WHERE pess.empresaid = :idempresa"   
    		+ "     AND pess.tiporelacionamento = :tiporelacionamento"   
    		+ "     AND pess.documento = :documento"     		
    		)
	List<Pessoa> FindByDocumento	(@Param("idempresa") int idempresa, @Param("tiporelacionamento") String tiporelacionamento
		                       , @Param("documento") String documento);		
	
}