package com.velocinotech.erp02.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.velocinotech.erp02.domain.Contatotipo;

@Repository
public interface ContatotipoRepository extends JpaRepository<Contatotipo, Integer> {

}