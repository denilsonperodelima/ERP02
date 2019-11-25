package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
	
	@Transactional(readOnly=true)
    @Query("select id,  clientenome, status, dtinclui from Pedido ped  "
    		+ "   WHERE ped.idempresa = :idempresa"   
    		+ "     AND ped.status = :status"     		
    		+ "     AND ped.clientenome like :nome% order by status, clientenome"     		
    		)
	List<Pedido> FindNomeLike	(@Param("status") String status, @Param("nome") String nome, @Param("idempresa") Integer idempresa);
}