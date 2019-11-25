package com.velocinotech.erp02.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.velocinotech.erp02.domain.Subgrupoitem;

@Repository
public interface SubgrupoitemRepository extends JpaRepository<Subgrupoitem, Integer> {


}