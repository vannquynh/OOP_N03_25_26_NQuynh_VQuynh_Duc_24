package com.example.WebTimViecLam.Repository;

import com.example.WebTimViecLam.Entity.LinhVuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinhVucRepository extends JpaRepository<LinhVuc, Integer> {
}
