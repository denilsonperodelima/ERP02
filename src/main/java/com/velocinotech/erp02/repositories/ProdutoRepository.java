package com.velocinotech.erp02.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.dto.ProdutoDTO;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

	//@Transactional(readOnly=true)
	//@Query("SELECT DISTINCT obj FROM Produto obj INNER JOIN obj.categorias cat WHERE obj.nome LIKE %:nome% AND cat IN :categorias")
	//Page<Produto> findDistinctByNomeContainingAndCategoriasIn(@Param("nome") String nome, @Param("categorias") List<Categoria> categorias, Pageable pageRequest);

	@Transactional(readOnly=true)
    @Query("select obj from Produto obj  "
    		+ "   WHERE obj.empresaid = :empresaid"       		
    		)
	List<ProdutoDTO> getProdutosEmpresa(@Param("empresaid") int empresaid
		                       );
	
	@Transactional(readOnly=true)
    @Query("select id,  nome, categoria, marca from Produto prod  "
    		+ "   WHERE prod.empresaid = :idempresa"     
    		+ "     AND prod.nome like %:nome%"     		
    		)
	List<Produto> FindNomeLike	(@Param("idempresa") int idempresa , @Param("nome") String nome);	
}

