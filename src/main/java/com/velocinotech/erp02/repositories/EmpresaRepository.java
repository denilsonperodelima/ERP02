package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Empresa;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
	
	@Transactional(readOnly=true)
    @Query("select id,  nome from Empresa emp  "
    		+ "   WHERE emp.nome like :nome%"    		
    		)
	List<Empresa> FindNomeLike(@Param("nome") String nome);
}