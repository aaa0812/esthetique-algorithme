using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;


public class TextManager : MonoBehaviour
{
    Dictionary<int, string> texts = new Dictionary<int, string>{
    { 5, "Bonjour." },
    { 7, "Savez-vous pourquoi vous êtes ici ?" },
    { 9, "Ne vous attendez pas à ce que j'ai la réponse." },
    { 11, "Pour de vrai, je n'en ai pas la moindre idée."},
    { 13, "Je sais seulement que vous devriez arrêter d'avancer."},
    { 14, "C'est un conseil."},
    { 15, "J'insiste."},
    };

    InputAction forward;
    private int clickCount;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        forward = InputSystem.actions.FindAction("Navigate/Forward");
    }

    // Update is called once per frame
    void Update()
    {
        if (forward.triggered)
        {
            clickCount++;
            displayText();
        }
    }

    void displayText()
    {
        if (texts.ContainsKey(clickCount))
        {
            Debug.Log(texts[clickCount]);
        }
    }
}
