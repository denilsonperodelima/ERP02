package com.velocinotech.erp02.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.velocinotech.erp02.domain.Vendedor;

@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, Integer> {

}