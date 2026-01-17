using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.InputSystem;

public class Chunk : MonoBehaviour
{
    InputAction forward;
    public float speed;
    public float spawnDistance;
    public GameObject chunk;
    private bool hasChild = false;
    private float time = 2f;

    void Start()
    {
        forward = InputSystem.actions.FindAction("Navigate/Forward");
    }

    void Update()
    {
        if (forward.triggered)
        {
            StartCoroutine(MoveForward());
        }
    }

    private IEnumerator MoveForward()
    {
        Vector3 startingPos = transform.position;
        Vector3 finalPos = transform.position + (transform.forward * -2);

        float elapsedTime = 0;

        Vector3 pos = transform.position;

        if (pos.z < -10)
        {
            Destroy(gameObject);
        }

        while (elapsedTime < time)
        {
            if (pos.z <= 0 && !hasChild)
        {
            hasChild = true;
            Vector3 spawnPos = new Vector3(0, 0, 0);
            spawnPos.z = pos.z + spawnDistance;
            Instantiate(chunk, spawnPos, Quaternion.identity);
        }

            transform.position = Vector3.Lerp(startingPos, finalPos, elapsedTime / time);
            elapsedTime += Time.deltaTime;
            yield return null;
        }
    }
}
