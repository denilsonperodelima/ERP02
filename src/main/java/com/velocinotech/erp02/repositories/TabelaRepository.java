package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Tabela;

@Repository
public interface TabelaRepository extends JpaRepository<Tabela, Integer> {
	@Transactional(readOnly=true)
    @Query("select grupo, subgrupo, descricao from Tabela tab  "
    		+ "   WHERE tab.idempresa = :idempresa"   
    		+ "     AND tab.grupo = :grupo"      		
    		)
	List<Tabela> getGrupo(@Param("idempresa") int idempresa, @Param("grupo") String grupo
		                       );	
	@Transactional(readOnly=true)
    @Query("select distinct(grupo) from Tabela tab  "
    		+ "   WHERE tab.idempresa = :idempresa"       		
    		)
	List<Tabela> getSomenteGrupos(@Param("idempresa") int idempresa
		                       );
}