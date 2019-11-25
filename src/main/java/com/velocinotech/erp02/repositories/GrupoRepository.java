package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Grupo;

@Repository
public interface GrupoRepository extends JpaRepository<Grupo, Integer> {

	@Transactional(readOnly=true)
    @Query("select obj from Grupo  obj  "
    		+ "   WHERE obj.idempresa = :idempresa"   
    		+ "     AND obj.descricao = :grupo order by descricao"      		
    		)
	Grupo getGrupo(@Param("idempresa") int idempresa, @Param("grupo") String grupo);
			
	
	@Transactional(readOnly=true)
    @Query("select id, descricao from Grupo grp  "
     		+ "   WHERE grp.idempresa = :idempresa"       		
   		)
	List<Grupo> getSomenteGrupos(@Param("idempresa") int idempresa
			);	
}